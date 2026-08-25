import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ElevenLabsConvaiAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  "agent-id"?: string;
  variant?: string;
  dismissible?: string;
  "avatar-orb-color-1"?: string;
  "avatar-orb-color-2"?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": ElevenLabsConvaiAttributes;
    }
  }
}

export {};
