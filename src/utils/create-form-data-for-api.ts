export const createFormDataForAPI = (
  params: Record<string, unknown>,
  supportedProperties: string[],
  keyMatch: Record<string, string>,
) => {
  const formData = new FormData();
  const jsonData: Record<string, unknown> = {};

  for (const key in params) {
    if (!supportedProperties.includes(key)) {
      continue;
    }

    const value = params[key];
    const formDataKey = keyMatch[key] || key;

    if (typeof value === 'object' && value instanceof File) {
      formData.append(formDataKey, value);
    } else if (typeof value === 'object') {
      formData.append(formDataKey, JSON.stringify(value));
      jsonData[formDataKey] = value;
    } else if (value) {
      formData.append(formDataKey, value.toString());
      jsonData[formDataKey] = value;
    }
  }

  formData.append('_json', JSON.stringify(jsonData));

  return formData;
};
