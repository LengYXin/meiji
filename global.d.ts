import React from 'react';

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare global {
  interface ApiResponse {
    data: any
    message: string
    msg: string
    code: number
    isSuccess: boolean
}
  namespace JSX {
      interface IntrinsicElements {
          'import': React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
      }
  }
} 