import * as React from 'react';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ReduxWrapper from "@/components/redux/ReduxWrapper";
import '../globals.css';
import ClientToaster from '@/components/library/ClientToaster';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const {locale} = params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = (await import(`@/../messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className='bg-white text-black'>
        <ReduxWrapper>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ClientToaster/>
            <Navbar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ReduxWrapper>
      </body>
    </html>
  );
}
