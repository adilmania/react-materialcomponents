/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
import Zrmc from "../";

/**
 * mdc-button
 *
 * See:
 * https://material.io/components/web/catalog/buttons/
 * http://material-components-web.appspot.com/button.html
 *
 * TODO:
 * - secondary no related css in mdc.css
 *
 */

const MDC_BUTTON = "mdc-button";

const Button = ({
  cardAction,
  children,
  compact,
  dense,
  disabled,
  icon,
  id,
  link,
  onClick,
  raised,
  ripple,
  secondary,
  stroked,
  unelevated,
  type,
  ...props
}) => {
  let classes = MDC_BUTTON;
  // Special case for inner buttons of CardActions
  if (cardAction) {
    classes += " mdc-button--compact mdc-card__action";
  } else {
    if (raised) {
      classes += " mdc-button--raised";
    }
    if (unelevated) {
      classes += " mdc-button--unelevated";
    }
    if (stroked) {
      classes += " mdc-button--stroked";
    }
    if (dense) {
      classes += " mdc-button--dense";
    }
    if (compact) {
      classes += " mdc-button--compact";
    }
    if (secondary) {
      classes += " secondary-filled-button";
    }
  }
  let i = "";
  if (icon) {
    i = <Icon className="mdc-button__icon" name={icon} />;
  }
  let element;
  if (link) {
    element = (
      <a id={id} href={link} className={classes}>
        {i}
        {children}
      </a>
    );
  } else {
    element = (
      <button
        id={id}
        className={classes}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {i}
        {children}
      </button>
    );
  }
  return Zrmc.render(element, props);
};

Button.defaultProps = {
  cardAction: false,
  children: null,
  compact: false,
  dense: false,
  disabled: false,
  icon: null,
  id: null,
  link: null,
  mdcElement: MDC_BUTTON,
  onClick: null,
  raised: false,
  ripple: false,
  secondary: false,
  stroked: false,
  type: "button",
  unelevated: false,
};

Button.propTypes = {
  cardAction: PropTypes.bool,
  children: PropTypes.node,
  compact: PropTypes.bool,
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  link: PropTypes.string,
  mdcElement: PropTypes.string,
  onClick: PropTypes.func,
  raised: PropTypes.bool,
  ripple: PropTypes.bool,
  secondary: PropTypes.bool,
  stroked: PropTypes.bool,
  unelevated: PropTypes.bool,
};

export default Button;
