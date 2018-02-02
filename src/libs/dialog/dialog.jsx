/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component, Children } from "react";
import PropTypes from "prop-types";
import DialogManager from "./manager";
import DialogHeader from "./header";
import DialogBody from "./body";
import DialogFooter from "./footer";
import Rmdc from "../";

/**
 * mdc-dialog
 * This implementation is different from Material Components
 * it uses HTML Dialog or its poylfill if not present
 * See
 * https://material.io/components/web/catalog/dialogs/
 * https://material-components-web.appspot.com/dialog.html
 *
 */
export default class Dialog extends Component {
  constructor(props) {
    super(props);
    this.dialogWidth = 0;
    this.dialogHeight = 0;
  }

  componentDidMount() {
    const dialog = this.dialogRef;

    // avoid chrome warnings and update only on unsupported browsers
    if (!dialog.showModal) {
      window.dialogPolyfill.registerDialog(dialog);
    }
    this.dialogRef.addEventListener("cancel", this.props.onCancel);
    if (this.props.open) {
      this.dialogRef.showModal();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.open) {
      if (!prevProps.open) {
        this.dialogRef.showModal();
      }

      // display the dialog at the right location
      // needed for the polyfill, otherwise it's not at the right position
      // const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      if (this.dialogRef) {
        const dialogWidth = this.dialogRef.clientWidth;
        const dialogHeight = this.dialogRef.clientHeight;
        if (dialogWidth !== this.dialogWidth || dialogHeight !== this.dialogHeight) {
          this.dialogWidth = dialogWidth;
          this.dialogHeight = dialogHeight;
          this.dialogRef.style.position = "fixed";
          this.dialogRef.style.top = `${(windowHeight - dialogHeight) / 2}px`;
          // this.dialogRef.style.left = `${(windowWidth - dialogWidth) / 2}px`;
        }
      } else {
        this.dialogRef.close();
      }
    }
  }

  componentWillUnmount() {
    this.dialogRef.removeEventListener("cancel", this.props.onCancel);
  }

  handleClick = (action = "close") => {
    if (this.props.onAction) {
      if (!this.props.onAction(action)) {
        return;
      }
    }
    DialogManager.close();
  }

  render() {
    const {
      className, open, header, children, actions, onClose, style, darkTheme, ...props
    } = this.props;
    let classes = "rmdc-dialog mdc-dialog";
    if (open) {
      classes += " mdc-dialog--open";
    }
    if (darkTheme) {
      classes += " mdc-dialog--theme-dark";
    }
    if (className) {
      classes = ` ${className}`;
    }
    const s = {};
    if (style && style.width) {
      s.width = style.width;
    }
    let headerElement = header;
    let footerElement;
    let bodyElement = Children.map(children, (child) => {
      let cs = "";
      if (child.props && child.props.className) {
        cs = child.props.className;
      }
      if (cs.startsWith("mdc-dialog__header")) {
        headerElement = child;
        return null;
      }
      if (cs.startsWith("mdc-dialog__footer")) {
        footerElement = child;
        return null;
      }
      return child;
    });
    // TODO check if children contains Header / Footer
    if (!(bodyElement.props &&
      bodyElement.props.className &&
      bodyElement.props.className.startsWith("mdc-dialog__body"))) {
      bodyElement = <DialogBody>{bodyElement}</DialogBody>;
    }
    if (!(headerElement && headerElement.props &&
      headerElement.props.className &&
      headerElement.props.className.startsWith("mdc-dialog__header"))) {
      headerElement = <DialogHeader>{header}</DialogHeader>;
    }
    if (!(footerElement && footerElement.props &&
      footerElement.props.className &&
      footerElement.props.className.startsWith("mdc-dialog__footer"))) {
      footerElement = <DialogFooter actions={actions} handleAction={this.handleClick} />;
    }
    const d = (
      <dialog
        role="presentation"
        style={s}
        ref={(c) => { this.dialogRef = c; }}
        className={classes}
        onKeyUp={() => { }}
        onClick={() => { this.props.onClose(); }}
      >
        <div
          className="mdc-dialog__surface"
          role="presentation"
          onKeyUp={() => { }}
          style={style}
          onClick={(e) => { e.stopPropagation(); }}
        >
          {headerElement}
          {bodyElement}
          {footerElement}
        </div>
      </dialog>
    );
    return Rmdc.render(d, props);
  }
}

Dialog.defaultProps = {
  className: null,
  header: null,
  actions: [{ name: "Ok" }],
  style: null,
  open: true,
  onClose: () => { DialogManager.close(); },
  onCancel: null,
  onAction: null,
  darkTheme: false,
};

Dialog.propTypes = {
  className: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.node, PropTypes.string]),
  children: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({})),
  style: PropTypes.objectOf(PropTypes.string),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onAction: PropTypes.func,
  darkTheme: PropTypes.bool,
};