// Types de configuration des modèles
export type {
  ModelConfigField,
  InputModelConfigField,
  CheckboxModelConfigField,
  RadioGroupModelConfigField,
  ModelConfigFieldTypes,
} from '../config/model-config-fields';

// Réexporter les constantes en tant que valeurs
export {
  TemplateNames,
  ModelNames,
  TemplateNameValues,
} from '../config/models';

// Importer les types pour les utiliser
import { TemplateNames, ModelNames } from '../config/models';

// Type pour un modèle
export type Model = {
  name: string;
  template: string;
  label: string;
  thumbnail: string;
  defaultOptions?: Record<string, unknown>;
};

// Type pour les valeurs de template
export type TemplateNameValue =
  (typeof TemplateNames)[keyof typeof TemplateNames];

// Type pour les valeurs de modèle
export type ModelNameValue = (typeof ModelNames)[keyof typeof ModelNames];
