import {
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib";
import React, { useEffect, useRef } from "react";
import CreatableSelect from 'react-select/creatable';
import chroma from 'chroma-js';


const MySliderComponent: React.FC<any> = (props) => {
  useEffect(() => {
    Streamlit.setFrameHeight();
  });

  const { theme } = props;
  const { label } = props.args;
  const rawOptions = props.args.options || [];
  const rawDefaultValues = props.args.default_values || [];
  
  const createOption = (label: string) => ({
    label,
    value: label,
  });

  


    // Convert these values to the format expected by CreatableSelect
    const options: Option[] = rawOptions.map((label: string) => createOption(label));
    const defaultSelectedOptions: Option[] = rawDefaultValues.map((label: string) => createOption(label));
  

//   // ... rest of your component ...
// };
  


  const rootRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
        Streamlit.setFrameHeight();
    });

    if (rootRef.current) {
        observer.observe(rootRef.current, { attributes: true, childList: true, subtree: true });
    }

    return () => {
        observer.disconnect();
    };
}, []);


  interface Option {
    readonly label: string;
    readonly value: string;
  }


  // const { minValue, maxValue, initialValue } = props.args;

  const handleSelectChange = (newvalue: any): void => {
    // console.log(newvalue);
    const optionLabels = newvalue.map((option: Option) => option.label);
    // Streamlit.setComponentValue(optionLabels);
    Streamlit.setComponentValue(optionLabels);
  };

  const isDarkTheme = theme.base === 'dark';
  const primaryColor = theme.primaryColor;
  const customStyles = {
    multiValue: (styles: any) => ({
        ...styles,
        backgroundColor: chroma(primaryColor).brighten(.1).hex(),
    }),
    multiValueLabel: (styles: any) => ({
        ...styles,
        color: chroma(primaryColor).darken(-5).hex(),
    }),
    multiValueRemove: (styles: any) => ({
        ...styles,
        color: chroma(primaryColor).darken(1.5).hex(),
        ':hover': {
            backgroundColor: chroma(primaryColor).alpha(0.1).hex(),
            color: chroma(primaryColor).darken(2).hex(),
        },
    }),
};

const isValidNewOption = (inputValue: string, selectValue: any, selectOptions: any) => {
  const isOptionAlreadyExists = selectOptions.some(
    (option: Option) => option.label === inputValue
  );
  console.log(isOptionAlreadyExists, inputValue, selectValue, selectOptions);
  return !isOptionAlreadyExists;
};

const customTheme = (defaultTheme: any) => ({
  ...defaultTheme,
  colors: {
      ...defaultTheme.colors,
      primary25: theme.primaryColor ,  
      primary: isDarkTheme ? '#fff' : 'black',
      neutral0: isDarkTheme ? '#333' : '#fff',  // Background color
      neutral80: isDarkTheme ? '#fff' : '#333',  // Text color
  },
});

  return (
    
      <div ref={rootRef}>
        {label && <h5 style={{ fontSize: '13px' ,fontFamily: 'Arial'}}>{label}</h5>}
        <CreatableSelect
        isMulti
        isClearable
        onChange={handleSelectChange}
        styles={customStyles}
        theme={customTheme}
        options={options}
        defaultValue={defaultSelectedOptions}
        isValidNewOption={isValidNewOption}
        
      />
        
      </div>
  );
};

export default withStreamlitConnection(MySliderComponent);