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
    label="Your Component Label",
    options=["Option 1", "Option 2", "Option 3"],
    default_values=["Option 1"]
)
```

## Parameters

- `label` (str): The label of the component.
- `options` (List[str]): A list of options to choose from.
- `default_values` (Optional[List[str]]): A list of default values to select. Defaults to None.
- `key` (Optional[str]): An optional key to use for the component. Defaults to None.
- `add_missing_defaults` (bool): If True, will add any default values that are not in the options list to the options list. Defaults to False.
- `on_change` (Optional[Callable]): An optional callback function to execute when the component value changes. **A key argument must be used to use the on_change** The callback must accept `key` as the first argument, and can accept more arguments. To accept these additional arguments, you need to pass `args`/`kwargs` to the component. Defaults to None.
- `args` (Optional[List]): An optional list of arguments to pass to the callback function. Defaults to None.
- `kwargs` (Optional[Dict]): An optional dictionary of keyword arguments to pass to the callback function. Defaults to None.

## Examples

### Simple Example

Here's a simple example of how to use `flexselect` in a Streamlit app:

```python
import streamlit as st
from streamlit_flexselect import flexselect

def main():
    st.title("Streamlit FlexSelect Simple Example")

    selected_values = flexselect(
        label="Select your favorite fruits",
        options=["Apple", "Orange", "Banana", "Grapes"],
        default_values=["Apple"]
    )

    st.write(f"You selected: {', '.join(selected_values)}")

if __name__ == "__main__":
    main()
```

### Example with on_change Callback

Here's an example that uses the `on_change` callback to write the selected elements using `st.session_state[key]`, and the arguments and keyword arguments:

```python
import streamlit as st
from streamlit_flexselect import flexselect

def on_change_callback(key, *args, **kwargs):
    selected_elements = st.session_state[key]
    st.write(f"Selected elements:", selected_elements)
    st.write(f"Args: {args}")
    st.write(f"Kwargs: {kwargs}")

def main():
    st.title("Streamlit FlexSelect Callback Example")

    selected_values = flexselect(
        label="Select your favorite fruits",
        options=["Apple", "Orange", "Banana", "Grapes"],
        default_values=["Apple"],
        on_change=on_change_callback,
        key='flexselect'
    )

if __name__ == "__main__":
    main()
```

### Example with add_missing_defaults
Sometimes we might want to add defeault options in our app, but let the user chose their own options as well. In this case, we can use the `add_missing_defaults` parameter to add any default values that are not in the options list to the options list. Here's an example:

```import streamlit as st
from streamlit_flexselect import flexselect

def main():
    st.title("Streamlit FlexSelect Example with add_missing_defaults")

    default_values = get_default_values_from_user()  # This is some function that gets a list of values from the user
    selected_values = flexselect(
        label="Select your favorite fruits",
        options=["Apple", "Orange", "Banana", "Grapes"],
        default_values=default_values,
        add_missing_defaults=True
    )

    st.write(f"You selected: {', '.join(selected_values)}")

if __name__ == "__main__":
    main()
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](<link-to-your-repo>).
