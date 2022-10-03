import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
import * as vi from 'src/assets/i18n/vi.json';
import * as en from 'src/assets/i18n/en.json';
import * as userVi from 'src/assets/i18n/user/vi.json';
import * as userEn from 'src/assets/i18n/user/en.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { vi, en, userVi, userEn },
    translocoConfig: {
      availableLangs: ['vi', 'en', 'userVi', 'userEn'],
      defaultLang: 'vi',
    },
    preloadLangs: true,
    ...options
  });
}
