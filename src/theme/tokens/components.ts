import { borderTokens } from './borders';

export const componentTokens = {
  button: {
    height: '40px',
    padding: '8px 20px',
    borderRadius: borderTokens.radius.small,
  },
  input: {
    height: '44px',
    borderRadius: borderTokens.radius.small,
  },
  card: {
    padding: '24px',
    borderRadius: borderTokens.radius.medium,
    elevation: 2, // Default MUI elevation level
  }
};