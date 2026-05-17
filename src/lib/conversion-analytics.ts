import { track } from '@vercel/analytics';

export type ConversionEventProps = Record<string, string | number | boolean>;

export function trackConversion(
  event: string,
  properties?: ConversionEventProps,
): void {
  if (properties && Object.keys(properties).length > 0) {
    track(event, properties as Record<string, string>);
    return;
  }
  track(event);
}
