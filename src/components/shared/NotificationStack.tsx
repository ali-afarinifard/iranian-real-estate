"use client";

import React, { useEffect } from "react";
import { Alert, Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector, selectNotifications } from "@/store";
import { uiActions } from "@/store/slices";
import { useTranslation } from "react-i18next";

export function NotificationStack() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const { i18n } = useTranslation();

  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    notifications.forEach((notif) => {
      const duration = notif.duration ?? 4000;
      const timer = setTimeout(() => {
        dispatch(uiActions.removeNotification(notif.id));
      }, duration);
      return () => clearTimeout(timer);
    });
  }, [notifications, dispatch]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        maxWidth: 380,
        width: "100%",
      }}
    >
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Alert
              severity={notif.type}
              onClose={() => dispatch(uiActions.removeNotification(notif.id))}
              sx={{
                borderRadius: 2,
                boxShadow: 4,
                "& .MuiAlert-action": {
                  "[dir='rtl'] &": {
                    position: "absolute",
                    left: 1,
                  },
                },
              }}
            >
              <strong style={{ marginRight: isRTL ? "15px" : 0 }}>{notif.title}</strong>
              {notif.message && (
                <>
                  <br />
                  {notif.message}
                </>
              )}
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}
