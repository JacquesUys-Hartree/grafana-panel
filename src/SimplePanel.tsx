import React from 'react';
import { PanelProps, SelectableValue } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme, AsyncMultiSelect } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

const asyncoptions: SelectableValue<string>[] = [
  { label: 'Basic option', value: '0' },
  { label: 'Option with description', value: '1', description: 'this is a description' },
  {
    label: 'Option with description and image',
    value: '2',
    description: 'This is a very elaborate description, describing all the wonders in the world.',
    imgUrl: 'https://placekitten.com/40/40',
  },]

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();

  const loadAsyncOptions = () => {
    return new Promise<Array<SelectableValue<string>>>((resolve) => {
      setTimeout(() => {
        resolve(asyncoptions);
      }, 2000);
    });
  };

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <AsyncMultiSelect
        onChange={() => {}}
        loadOptions={loadAsyncOptions}
      />

      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.seriesCountSize]};
            `}
          >
            Number of series: {data.series.length}
          </div>
        )}
        <div>Text option value: {options.text}</div>
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});