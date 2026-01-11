import React from 'react';

export const IconContacts = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} {...props}>
    <circle cx="12" cy="8" r="3" />
    <path strokeLinecap="round" d="M5 18c0-3.2 3.6-5 7-5s7 1.8 7 5" />
  </svg>
);

export const IconPlus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
  </svg>
);

export const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="11" cy="11" r="6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17l4 4" />
  </svg>
);

export const IconMail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 5 9-5" />
  </svg>
);

export const IconPhone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h3l2 5-2 1a10 10 0 005 5l1-2 5 2v3a2 2 0 01-2 2 15 15 0 01-13-13 2 2 0 012-2z" />
  </svg>
);

export const IconCalendar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v4m8-4v4M4 10h16" />
  </svg>
);

export const IconNote = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h7l5 5v9a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.5V9h5.5" />
  </svg>
);

export const IconEye = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

export const IconEdit = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.06 7.06l2.88-2.88a1.5 1.5 0 012.12 0l1.06 1.06a1.5 1.5 0 010 2.12l-2.88 2.88" />
  </svg>
);

export const IconTrash = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6m4-6v6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7l1-2h4l1 2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12" />
  </svg>
);
