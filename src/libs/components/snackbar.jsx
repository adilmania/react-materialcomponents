/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Zrmc from "../";

/**
 * mdc-layout-grid__cell
 *
 * See:
 * https://material.io/components/web/catalog/snackbars/
 * https://material-components-web.appspot.com/snackbar.html
 *
 */

const MDC_SNACKBAR = "mdc-snackbar";

export default class Snackbar extends Component {
  constructor(props) {
    super(props);
    const { active } = props;
    this.state = { active };
  }

  componentDidMount() {
    this.setTimer();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.active !== prevState.active) {
      return { active: nextProps.active };
    }
    return null;
  }

  componentDidUpdate() {
    this.setTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  setTimer() {
    this.clearTimer();
    if (this.state.active) {
      this.timer = setTimeout(() => {
        this.desactivate();
      }, this.props.timeout);
    }
  }

  desactivate = () => {
    this.setState({ active: false });
    this.timer = null;
    if (this.props.onTimeout) {
      this.props.onTimeout();
    }
  };

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const {
      active,
      message,
      timeout,
      onTimeout,
      onAction,
      actionText,
      multiline,
      actionOnBottom,
      startAligned,
      ...props
    } = this.props;
    const sactive = this.state.active;
    let classes = MDC_SNACKBAR;
    if (sactive) {
      classes += " mdc-snackbar--active";
    }
    if (multiline) {
      classes += " mdc-snackbar--multiline";
    }
    if (actionOnBottom) {
      classes += " mdc-snackbar--action-on-bottom";
    }
    if (actionOnBottom) {
      classes += " mdc-snackbar--action-on-bottom";
    }
    if (startAligned) {
      classes += " mdc-snackbar--align-start";
    }
    let actionWrapper = "";
    if (onAction && actionText) {
      actionWrapper = (
        <div className="mdc-snackbar__action-wrapper">
          <button
            type="button"
            className="mdc-snackbar__action-button"
            onClick={onAction}
          >
            {actionText}
          </button>
        </div>
      );
    }
    return Zrmc.render(
      <div
        className={classes}
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden="true"
      >
        <div className="mdc-snackbar__text">{message}</div>
        {actionWrapper}
      </div>,
      props,
    );
  }
}

Snackbar.defaultProps = {
  mdcElement: MDC_SNACKBAR,
  active: true,
  timeout: 2750,
  onAction: null,
  onTimeout: null,
  actionText: null, // Required if actionHandler
  multiline: false,
  actionOnBottom: false,
  startAligned: false,
};

Snackbar.propTypes = {
  mdcElement: PropTypes.string,
  active: PropTypes.bool,
  message: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  onAction: PropTypes.func,
  onTimeout: PropTypes.func,
  actionText: PropTypes.string, // Required if actionHandler
  multiline: PropTypes.bool,
  actionOnBottom: PropTypes.bool,
  startAligned: PropTypes.bool,
};
