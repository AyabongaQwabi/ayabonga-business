/** Production clients and partners shown in the homepage trust strip. */

export type ClientTrustLogo = {
  id: string;
  name: string;
  /** External site; omit for name-only entries (no public product URL). */
  url?: string;
};

export const CLIENT_TRUST_LOGOS: ClientTrustLogo[] = [
  { id: 'clinicplus', name: 'ClinicPlus', url: 'https://clinicplusbookings.co.za/' },
  { id: 'utap', name: 'uTap', url: 'https://utaptech.co.za' },
  { id: 'laundry', name: 'Laundry Marketplace', url: 'https://laundry.qwabi.co.za' },
  { id: 'warner', name: 'Warner Music Africa' },
  { id: 'wclabs', name: 'Western Cape Labs' },
  { id: 'queensconnect', name: 'Queens Connect', url: 'https://queensconnect.qwabi.co.za' },
];
