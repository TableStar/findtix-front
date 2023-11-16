const InputBoxForm = (props) => {
  return (
    <div
      className={`input-box relative flex flex-col shadow appearance-none ${
        props.focusState ? `border-2` : `border`
      } rounded ${
        props.focusState ? ` border-blue-500` : ``
      } h-12 w-full lg:${props.lgWidth} text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${props.className}`}
    >
      <label
        htmlFor={`${props.htmlName}`}
        className={`${
          props.focusState || props.labelState?.length > 0 ? ` block` : `hidden`
        } h-full input-label ${
          props.focusState ? `text-blue-500` : `text-gray-500`
        }  text-xs select-none leading-none`}
      >
        {props.placeholderText}
      </label>
      <div className="flex-1 leading-none">
        <input
          type={props.inputType}
          className={` border-none focus:outline-none h-full w-full text-gray-700 leading-tight`}
          name={`${props.names}`}
          onFocus={() => props.setFocusState(true)}
          onBlur={() => props.setFocusState(false)}
          onChange={props.onChanger}
          placeholder={props.focusState ? `` : props.placeholderText}
          defaultValue={props.defaultValue}
        />
      </div>
    </div>
  );
};

export default InputBoxForm;
