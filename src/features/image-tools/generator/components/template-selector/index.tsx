import {
  FormFieldError,
  type FormFieldError as FormFieldErrorType,
} from '@common/components/forms/form-field-error';
import './style.css';
import { Display } from '@common/components/display';
import { CheckBadge } from '@common/components/check-badge';

export type TemplateSelectorProps = {
  templateList: { name: string; label: string; thumbnail?: string }[];
  selectedTemplate?: string;
  onSelectTemplate: (templateName: string) => void;
  error: FormFieldErrorType | undefined;
};

export const TemplateSelector = (props: TemplateSelectorProps) => {
  const { templateList, selectedTemplate, onSelectTemplate, error } = props;

  return (
    <div className="template-selector">
      <Display type="flex" className="template-selector__list">
        {templateList.map(template => (
          <div
            key={template.name}
            className={`template-selector__selectable ${selectedTemplate === template.name ? ' template-selector__selectable_selected' : ''}`}
            onClick={() => onSelectTemplate(template.name)}
          >
            <div className="template-selector__thumbnail">
              {template.thumbnail && (
                <img src={template.thumbnail} alt={template.label} />
              )}
              <CheckBadge className="template-selector__badge" />
            </div>
            <div className="template-selector__info">{template.label}</div>
          </div>
        ))}
      </Display>
      {error && <FormFieldError error={error} />}
    </div>
  );
};
