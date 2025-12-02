import { Display } from '@common/components/display';
import { CheckBadge } from '@common/components/check-badge';
import { Form, type FormErrorType } from '@common/components/forms';
import './style.css';

export type ModelSelectorProps = {
  modelList: {
    template: string;
    name: string;
    label: string;
    thumbnail?: string;
  }[];
  selectedModel?: { name: string; template: string };
  onSelectModel: ({
    name,
    template,
  }: {
    name: string;
    template: string;
  }) => void;
  error: FormErrorType | undefined;
};

export const ModelSelector = (props: ModelSelectorProps) => {
  const { modelList, selectedModel, onSelectModel, error } = props;

  return (
    <div className="model-selector">
      <Display type="flex" className="model-selector__list">
        {modelList.map(model => (
          <div
            key={model.name}
            className={`model-selector__selectable ${selectedModel?.name === model.name ? ' model-selector__selectable_selected' : ''}`}
            onClick={() =>
              onSelectModel({ name: model.name, template: model.template })
            }
          >
            <div className="model-selector__thumbnail">
              {model.thumbnail && (
                <img src={model.thumbnail} alt={model.label} />
              )}
              <CheckBadge className="model-selector__badge" />
            </div>
            <div className="model-selector__info">{model.label}</div>
          </div>
        ))}
      </Display>
      {error && <Form.Error error={error} />}
    </div>
  );
};
