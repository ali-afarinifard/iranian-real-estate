"use client";

import React, { useCallback, useReducer } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { VisibilityRounded, VisibilityOffRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store";
import { authActions, uiActions } from "@/store/slices";
import { LoginSchema } from "@/lib/validations/schemas";
import type { LoginFormData } from "@/lib/validations/schemas";
import type { authSlice } from "@/store/slices";

type User = NonNullable<ReturnType<typeof authSlice.getInitialState>["user"]>;

interface IFormState {
  fields: LoginFormData;
  errors: Partial<LoginFormData>;
  showPassword: boolean;
  isLoading: boolean;
  apiError: string;
}

type FormAction =
  | { type: "SET_FIELD"; field: keyof LoginFormData; value: string }
  | { type: "SET_ERRORS"; errors: Partial<LoginFormData> }
  | { type: "TOGGLE_PASSWORD" }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_API_ERROR"; message: string };

const initialState: IFormState = {
  fields: { email: "", password: "" },
  errors: {},
  showPassword: false,
  isLoading: false,
  apiError: "",
};

function formReducer(state: IFormState, action: FormAction): IFormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        fields: { ...state.fields, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: "" },
        apiError: "",
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "TOGGLE_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "SET_LOADING":
      return { ...state, isLoading: action.value };
    case "SET_API_ERROR":
      return { ...state, apiError: action.message, isLoading: false };
    default:
      return state;
  }
}

export function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [state, formDispatch] = useReducer(formReducer, initialState);
  const { fields, errors, showPassword, isLoading, apiError } = state;

  const isRTL = i18n.dir() === "rtl";

  const rtlFieldSx = isRTL
    ? {
        "& .MuiInputLabel-root": {
          right: 12,
          left: "auto",
          transformOrigin: "top right",
          "&.MuiInputLabel-shrink": {
            transform: "translate(0, -9px) scale(0.75)",
            right: 18,
            left: "auto",
          },
          "&:not(.MuiInputLabel-shrink)": {
            transform: "translate(0, 16px) scale(1)",
            right: 14,
            left: "auto",
          },
        },
        "& .MuiOutlinedInput-notchedOutline legend": {
          textAlign: "right",
          marginRight: "4px",
        },
        "& .MuiInputBase-input": {
          textAlign: "right",
          direction: "rtl" as const,
        },
      }
    : {};

  const handleChange = useCallback(
    (field: keyof LoginFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        formDispatch({ type: "SET_FIELD", field, value: e.target.value });
      },
    [],
  );

  const handleTogglePassword = useCallback(() => {
    formDispatch({ type: "TOGGLE_PASSWORD" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = LoginSchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors = Object.fromEntries(
        result.error.errors.map((err) => [err.path[0], err.message]),
      ) as Partial<LoginFormData>;
      formDispatch({ type: "SET_ERRORS", errors: fieldErrors });
      return;
    }

    formDispatch({ type: "SET_LOADING", value: true });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data: { user?: User; message?: string } = await res.json();

      if (!res.ok) {
        formDispatch({
          type: "SET_API_ERROR",
          message: data.message ?? t("auth.login.errorDefault"),
        });
        return;
      }

      dispatch(authActions.setUser(data.user!));
      dispatch(
        uiActions.addNotification({
          type: "success",
          title: t("auth.login.successWelcome", { name: data.user!.name }),
          duration: 3000,
        }),
      );
      router.push("/dashboard");
    } catch {
      formDispatch({
        type: "SET_API_ERROR",
        message: t("auth.login.errorNetwork"),
      });
    } finally {
      formDispatch({ type: "SET_LOADING", value: false });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {apiError && (
        <Alert severity="error" sx={{ mb: 3 }} role="alert">
          {apiError}
        </Alert>
      )}

      <TextField
        label={t("auth.login.emailLabel")}
        type="email"
        value={fields.email}
        onChange={handleChange("email")}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        required
        autoComplete="email"
        autoFocus
        inputProps={{
          "aria-describedby": errors.email ? "email-error" : undefined,
        }}
        sx={{ mb: 2.5, ...rtlFieldSx }}
      />

      <TextField
        label={t("auth.login.passwordLabel")}
        type={showPassword ? "text" : "password"}
        value={fields.password}
        onChange={handleChange("password")}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        required
        autoComplete="current-password"
        sx={{ mb: 3, ...rtlFieldSx }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePassword}
                edge="end"
                size="small"
                aria-label={
                  showPassword
                    ? t("auth.login.hidePassword")
                    : t("auth.login.showPassword")
                }
              >
                {showPassword ? (
                  <VisibilityOffRounded />
                ) : (
                  <VisibilityRounded />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isLoading}
        aria-busy={isLoading}
        sx={{ mb: 2 }}
      >
        {isLoading ? t("auth.login.submitting") : t("auth.login.submitButton")}
      </Button>
    </Box>
  );
}
