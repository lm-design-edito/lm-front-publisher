import type React from 'react';
import './style.css';

type HeadlineProps = {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
};

const Headline = ({ title, description }: HeadlineProps) => {
  return (
    <div className={`headline ${description ? 'headline_description' : ''}`}>
      <h2>{title}</h2>
      {description && (
        <>
          {typeof description === 'string' ? (
            <p className="headline__description">{description}</p>
          ) : (
            description
          )}
        </>
      )}
    </div>
  );
};

export { Headline };
