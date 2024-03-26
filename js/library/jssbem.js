export default function jssBem() {
  const onCreateRule = (name, styles, options) => {
    const modifiers = Object.keys(styles)
      .filter(k => k[0] === "_")
      .map(k => ({ modifierName: `${name}${k}`, modifierStyles: styles[k] }));

    if (modifiers.length) {
      modifiers.forEach(({ modifierName, modifierStyles }) => {
        options.sheet.addRule(modifierName, modifierStyles, {
          ...options,
          isModifier: true
        });
      });
    }
    return null;
  };

  const onProcessRule = (rule, sheet) => {};

  const onProcessStyle = (style, rule) => {
    return style;
  };

  const onChangeValue = (value, prop, rule) => {};

  const onProcessSheet = sheet => {};

  const onUpdate = (data, rule, sheet) => {};

  return {
    onCreateRule,
    onProcessStyle,
    onProcessRule,
    onUpdate,
    onChangeValue,
    onProcessSheet
  };
}
