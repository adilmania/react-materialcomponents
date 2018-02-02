/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import DialogManager from "./dialog/manager";
import MenuAnchor from "./menu/anchor";

/**
 * Rmdc
 * Global & helper class
 * It handle
 * ripple : TODO
 * https://material.io/components/web/catalog/ripples/
 * rtl : DONE
 * https://material.io/components/web/catalog/rtl/
 * theme : TODO
 * https://material.io/components/web/catalog/theme/
 * elevation : DONE
 * https://material.io/components/web/catalog/elevation/
 * typography: DONE
 * https://material.io/components/web/catalog/typography/
 */
const Rmdc = new class {
  init(root, {
    rtl, darkTheme, style, typography, ripple,
  }) {
    this.rtl = rtl;
    this.changeTheme(darkTheme, style);
    this.typography = typography;
    if (rtl) {
      const html = document.getElementsByTagName("html")[0];
      html.setAttribute("dir", "rtl");
    }

    if (typography) {
      document.body.className += " mdc-typography";
    }

    if (ripple) {
      this.ripple = ripple;
    }
    DialogManager.init();
  }

  changeTheme(darkTheme, style) {
    this.darkTheme = darkTheme;
    if (darkTheme) {
      document.body.className += " mdc-theme--dark";
    }
    this.style = style; // TODO style
  }

  render(element, {
    rtl, elevation, theme, typography, ripple, menu,
  }/* , elementType = null */) {
    const ps = { };
    let change = false;
    let classes = element.props.className || "";
    if (rtl && (!this.rtl)) {
      ps.dir = "rtl";
      change = true;
    }
    if (elevation) {
      const e = Number(elevation);
      if (Number.isInteger(e) && e > -1 && e < 25) {
        classes += ` mdc-elevation--z${e}`;
        change = true;
      }
    }
    if (theme) {
      // TODO
      change = true;
    }
    if (typography) {
      // TODO validate value
      classes += ` mdc-typography--${typography}`;
      change = true;
    }
    if (ripple && this.ripple) {
      // TODO
      change = true;
    }
    if (change) {
      ps.className = classes;
      return React.cloneElement(element, ps);
    }
    if (menu) {
      // Create Menu Anchor
      return React.createElement(MenuAnchor, { menu, anchor: element });
    }
    return element;
  }

  showDialog(dialog) {
    this.dialog = dialog;
    // TODO openDialog
    DialogManager.open(dialog);
  }

  closeDialog() {
    this.dialog = null;
    // TODO close current dialog
    DialogManager.closeCurrentDialog();
  }

  enableClickOutside(callback) {
    this.outsideCallback = callback;
    document.addEventListener("click", callback, true);
  }

  disableClickOutside(callback) {
    this.outsideCallback = null;
    document.removeEventListener("click", callback, true);
  }
}();

export default Rmdc;