"use client";

import { useState, useEffect } from "react";

export type PerformanceTier = 0 | 1 | 2;

interface DevicePerformance {
  tier: PerformanceTier;
  isMobile: boolean;
  particleCount: number;
  enablePostProcessing: boolean;
  dpr: number;
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    tier: 2,
    isMobile: false,
    particleCount: 3000,
    enablePostProcessing: true,
    dpr: 1.5,
  });

  useEffect(() => {
    const detect = async () => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;

      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

      if (!gl || isMobile) {
        setPerformance({
          tier: 0,
          isMobile: true,
          particleCount: 0,
          enablePostProcessing: false,
          dpr: 1,
        });
        return;
      }

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : "";

      const isLowEnd =
        /Intel|Mesa|SwiftShader|llvmpipe/i.test(renderer) ||
        window.devicePixelRatio < 1.5;

      if (isLowEnd) {
        setPerformance({
          tier: 1,
          isMobile: false,
          particleCount: 80,
          enablePostProcessing: false,
          dpr: 1,
        });
      } else {
        setPerformance({
          tier: 2,
          isMobile: false,
          particleCount: 200,
          enablePostProcessing: true,
          dpr: Math.min(window.devicePixelRatio, 1.5),
        });
      }

      canvas.remove();
    };

    detect();
  }, []);

  return performance;
}
