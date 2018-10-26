import React from 'react';
import PropTypes from 'prop-types';

import PanelTitle from '../../../components/panel-title';
import ImporterDropzone from '../dropzone';
import TransitionFadeInOut from '../../../components/transition-fade-in-out';
import ImportExecutor from './executor';

class SourceImporter extends React.Component {
  static propTypes = {
    source: PropTypes.shape({
      acceptedTypes: PropTypes.string,
      instructions: PropTypes.string,
      multiple: PropTypes.bool,
      optionsHint: PropTypes.string,
    }),
  };

  state = {
    acceptedFiles: undefined,
  };

  render() {
    const {
      acceptedTypes,
      instructions,
      multiple = false,
      optionsHint,
    } = this.props.source;
    const { acceptedFiles } = this.state;

    const hasAcceptedFile = Boolean(acceptedFiles);

    return (
      <div className="source-importer">
        <PanelTitle headingLevel="3">Import file{multiple && 's'}</PanelTitle>
        <ImporterDropzone
          acceptedTypes={acceptedTypes}
          multiple={multiple}
          onAccept={files => this.setState({ acceptedFiles: files })}
          onReset={() => this.setState({ acceptedFiles: undefined })}
        />
        {!hasAcceptedFile && (
          <p className="theme-color-fg-dim">{instructions}</p>
        )}
        <TransitionFadeInOut
          wrapperClassName="source-importer__executor-wrapper"
          shouldMount={hasAcceptedFile}
        >
          <ImportExecutor
            hint={optionsHint}
            startImport={() => console.log(acceptedFiles)}
          />
        </TransitionFadeInOut>
      </div>
    );
  }
}

export default SourceImporter;