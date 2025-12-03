import type React from 'react';
import { Text } from '@common/components/text';
import './style.css';

type HeadlineProps = {
  breadcrumbs?: React.ReactNode;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
};

const Headline = ({ title, description, breadcrumbs }: HeadlineProps) => {
  return (
    <div
      className={`headline ${description ? 'headline_description' : ''} ${breadcrumbs ? 'headline_breadcrumbs' : ''}`}
    >
      {breadcrumbs && (
        <div className="headline__breadcrumbs">{breadcrumbs}</div>
      )}
      <h2 className="headline__title">{title}</h2>
      {description && (
        <>
          {typeof description === 'string' ? (
            <Text className="headline__description">{description}</Text>
          ) : (
            description
          )}
        </>
      )}
    </div>
  );
};

export { Headline };
