import rateLimit from "express-rate-limit";
import logger from "../config/logger";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite por IP
  handler: (req, res) => {
    logger.warn("Rate limit exceeded", { ip: req.ip, path: req.path });
    res
      .status(429)
      .json({ message: "Too many requests, please try again later" });
  },
});
