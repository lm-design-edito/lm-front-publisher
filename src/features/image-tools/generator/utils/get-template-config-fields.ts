import TEMPLATE_CONFIG_FIELDS, {
  type TemplateConfigField,
} from '../config/template-config-fields';

export const getTemplateConfigFields = (
  templateName?: string,
): TemplateConfigField[] => {
  const fallbackFields: TemplateConfigField[] = [];
  console.log('getTemplateConfigFields', templateName);
  if (!templateName) {
    return fallbackFields;
  }

  const templateConfig =
    TEMPLATE_CONFIG_FIELDS[templateName as keyof typeof TEMPLATE_CONFIG_FIELDS];
  if (templateConfig) {
    return templateConfig.formFields || [];
  }

  return fallbackFields;
};
