// Logger utility to handle development vs production logging
const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },
  error: (message: string, error?: unknown) => {
    if (isDevelopment) {
      console.error(message, error);
    }
    // In production, you might want to send errors to a logging service
  },
  warn: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  }
};

// Security: Remove sensitive data from logs
export const sanitizeForLogging = (data: Record<string, unknown>) => {
  const sensitiveFields = ['password', 'confirmPassword', 'token', 'secret'];
  const sanitized = { ...data };
  
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });
  
  return sanitized;
};