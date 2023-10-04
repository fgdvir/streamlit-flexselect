# Streamlit FlexSelect

A flexible select component for Streamlit that allows users to select one or more options from a list. In addition to the given options, users can also add their own options dynamically.

## Installation

Install `streamlit-flexselect` via pip:

```bash
pip install streamlit-flexselect
```

## Usage

To use `flexselect` in your Streamlit app:

1. First, import the component:

```python
from streamlit_flexselect import flexselect
```

2. Use the `flexselect` function in your Streamlit app:

```python
selected_values = flexselect(
    name="Your Component Name",
    options=["Option 1", "Option 2", "Option 3"],
    default_values=["Option 1"]
)
```

- `name` (str): The name of the component.
- `options` (List[str]): A list of options to choose from.
- `default_values` (Optional[List[str]]): A list of default values to select. Defaults to None.

The function returns the values selected by the user.

## Example

Here's a simple example of how to use `flexselect` in a Streamlit app:

```python
import streamlit as st
from streamlit_flexselect import flexselect

def main():
    st.title("Streamlit FlexSelect Example")

    selected_values = flexselect(
        name="Select your favorite fruits",
        options=["Apple", "Orange", "Banana", "Grapes"],
        default_values=["Apple"]
    )

    st.write(f"You selected: ", selected_values)

if __name__ == "__main__":
    main()
```

Run your Streamlit app:

```bash
streamlit run app.py
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](<link-to-your-repo>).
