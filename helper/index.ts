import slugifyString from 'slugify';

export const slugify = (value: string) => {
  return slugifyString(value, { remove: /[*+~.()'"!:@]/g })
}