import { CircleBadge } from '@common/components/circle-badge';
import { Form, type FormErrorType } from '@common/components/forms';
import { OverflowList } from '@common/components/overflow-list';
import { Badge } from '@common/components/badge';
import './style.css';

export type ModelSelectorProps = {
  modelList: {
    name: string;
    template: string;
    label: string;
    category?: string;
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
      <OverflowList>
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
              <CircleBadge icon="check" className="model-selector__badge" />
            </div>
            <div className="model-selector__info">
              {model.category && (
                <span className="model-selector__category">
                  <Badge color="purple" size="s">
                    {model.category}
                  </Badge>
                </span>
              )}
              <span>{model.label}</span>
            </div>
          </div>
        ))}
      </OverflowList>
      {error && <Form.Error error={error} />}
    </div>
  );
};
