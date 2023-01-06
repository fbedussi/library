const PX_TO_REM_RATIO = 16;

export const pxToRem = (px: number | string): number => (typeof px === 'string' ? parseInt(px) : px) / PX_TO_REM_RATIO;
