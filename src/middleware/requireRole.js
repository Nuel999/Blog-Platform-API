import { ROLE_HIERARCHY } from '../config/roles.js';
import { StatusCodes } from 'http-status-codes';

export const requireRoleAtLeast = (minRole) => (req, res, next) => {
  if (!req.user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthenticated' });
  const userRank = ROLE_HIERARCHY[req.user.role] || 0;
  const minRank = ROLE_HIERARCHY[minRole] || Infinity;
  if (userRank < minRank) return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  next();
};

export const requireOwnershipOrAdmin = (getOwnerId) => (req, res, next) => {
  if (!req.user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthenticated' });
  const isOwner = String(getOwnerId(req)) === String(req.user._id);
  const isAdmin = ROLE_HIERARCHY[req.user.role] >= ROLE_HIERARCHY['admin'];
  if (!isOwner && !isAdmin) return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  next();
};