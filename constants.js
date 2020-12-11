const constant = {
  onboarding: {
    welcome: {
      heading: 'ثبت نام',
      emailPassword: '',
      emailValidation: 'Visit my GitHub at https://github.com/onmyway133',
      button: 'Log in',
    },
    term: {
      heading: 'Terms and conditions',
      button: 'Read',
    },
  },
};

export const forms = {
  registrationHeader: 'ثبت نام در کوچه مبل',
  loginHeader: 'ورود به حساب کاربری',
  email: {
    enter: 'ایمیل خود را وارد کنید',
    check: 'ایمیل نامعتبر است',
  },
  password: {
    enter: 'رمز عبور را وارد نمایید',
    check: 'رمز عبور هم خوانی ندارد',
    validation: 'رمز عبور باید حداقل 8 کاراکتر و شامل عدد و حروف باشد',
  },
  code: 'کد تایید را به درستی وارد کنید',
  existingAccount: 'در کوچه مبل حساب کاربری دارید ؟ ورود',
  notRegistered: 'فروشگاه خودت را بساز، ثبت نام',
  emailPasswordHint:
    'لطفا برای ثبت نام ابتدا ایمیل خود به همراه یک رمز عبور دلخواد وارد کنید',
  validationhint:
    'یک کد فعال سازی به ایمیل شما ارسال شده است. لطفا ایمیل خود را بررسی کنید. کد فعالسازی خود را در کادر زیر وارد کنید',
  loginHint: 'لطفا ایمیل و رمز عبور  هنگام ثبت نام را وارد کنید',
  labels: {
    email: 'ایمیل',
    password: 'رمز عبور',
    confirmPassword: 'تکرار رمز عبور',
  },
  acceptTerms: {
    hint: 'تمام قوانین سایت را مطالعه کرده و قبول دارم',
    error: 'پذیرفتن قوانین سایت الزامی است',
  },
  buttonns: {
    registration: 'ثبت نام',
    resendCode: 'ارسال مجدد کد ',
    login: 'ورود',
    validation: 'اعتبار سنجی',
    login: 'ورود',
  },
};

export const MerchantProfile = {
  merchantForm: {
    name: 'نام',
    family: 'نام خانوادگی',
    birthday: 'تاریخ تولد',
    gender: 'جنسیت',
    nationalCode: 'کدملی',
    email: 'ایمیل',
    tel: 'شماره تلفن ثابت',
    address: 'آدرس',
    postalCode: 'کد پستی',
    phone: 'شماره تلفن همراه',
    province: 'انتخاب استان',
    city: 'انتخاب شهر',
    personalInfo: 'اطلاعات فردی',
    callInfo: 'اطلاعات تماس',
    saveChanges: 'ذخیره تغییرات',
    edit: 'ویرایش',
    profileImage: 'تصویر پروفایل',
    license: 'تصویر کارت ملی',
    hintProfileImage: 'بارگذاری تصویر پروفایل',
    hintLicense: 'بارگذاری تصویر کارت ملی',
  },
  error: {
    name: 'نام خود را وارد کنید',
    family: 'نام خانوادگی خود را وارد کنید',
    birthday: ' تاریخ نولد خود را وارد کنید',
    gender: 'یک گزینه را انتخاب کنید',
    nationalCode: 'کد ملی خود را وارد کنید',
    nationalCodeLength: 'کد ملی باید شامل ده رقم باشد',
    email: 'ایمیل خود را وارد کنید',
    tel: 'شماره تلفن خود را وارد کنید',
    telLength: 'شماره تلفن باید شامل هشت رقم باشد',
    address: 'آدرس خود را به صورت دقیق وارد کنید',
    postalCode: 'کد پستی را وارد کنید',
    phone: 'شماره تلفن همراه خود را وارد کنید',
    phoneLength: 'شماره موبایل باید شامل یازده رقم باشد',
    province: ' استان خود را انتخاب کنید',
    city: 'شهر خود را انتخاب کنید ',
  },
};

export const merchantBusinessForm = {
  businessForm: {
    businessInfo: 'اطلاعات تجاری',
    storeStatus: 'وضعیت فروشگاه',
    inActive: 'غیرفعال',
    pending: 'در انتظار تایید',
    active: 'فعال',
    merchantCode: 'کد فروشنده',
    businessCode: 'کد اقتصادی',
    licenseImage: 'تصویر جواز',
    hintLicenseImage: 'بارگذاری جوار کسب و کار',
    merchantType: 'نوع فروشنده',
    businessName: 'نام فروشگاه',
    vatLicense: 'گواهی ارزش افزوده',
    saveChanges: 'ذخیره اطلاعات',
    edit: 'ویرایش',
  },
  error: {
    storeStatus: '',
    merchantCode: 'کد فروشنده را وارد کنید',
    businessCode: 'کد اقتصادی را وارد کنید',
    merchantType: 'نوع فروشنده را انتخاب کنید',
    storeName: 'نام فروشگاه را وارد کنید',
    vatLicense: 'یک گزینه را انتخاب کنید',
  },
};

export const merchantDetail = {
  header: {
    profile: 'پروفایل',
    storeSelectLabel: 'تغییر وضعیت فروشگاه',
    title: 'مدیریت پیشه وران',
    selectLabel: 'تغییر وضعیت پروفایل پیشه ور',
    pending: 'در انتظار تایید',
    active: ' تایید شده',
    inActive: 'تایید نشده',
    remove: 'حذف',
    back: 'برگشت',
    store: 'فروشگاه',
    confirm: 'تایید',
  },
  toasts: {
    error: 'پروفایل پیشه ور به حالت تایید نشده درآمد',
    warn: 'پروفایل پیشه ور به حالت در  انتظار تایید در آمد',
    success: 'پروفایل پیشه ور با موفقیت تایید شد',
  },
};
export const merchantStore = {
  managment: 'مدیریت فروشگاه',
  name: 'نام فروشگاه / برند',
  about: 'درباره فروشگاه',
  type: 'نوع فروشگاه',
  tag: 'تگ های فروشگاه',
  callInfo: 'اطلاعات تماس فروشگاه',
  tel: 'تلفن',
  address: 'آدرس',
  image: 'بارگذاری  تصاویر فروشگاه',
  logo: 'لوگو',
  catalog: 'کاتالوگ / رزومه',
  gallery: 'گالری فروشگاه',
  edit: 'ویرایش',
  saveChanges: 'ذخیره تغییرات',
  error: {
    name: 'نام فروشگاه یا برندرا وارد کنید',
    about: 'توضیحات مربوط به فروشگاه را به صورت کامل بیان کنید',
    tel: 'تلفن یازده رقمی فروشگاه را وارد کنید',
    telLength: 'شماره تلفن باید شامل یازده رقم باشد',
    address: 'آدرس فروشگاه را وارد کنید',
  },
};
