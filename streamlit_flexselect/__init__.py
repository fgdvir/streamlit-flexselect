import os
import streamlit as st
from typing import List, Optional
import streamlit.components.v1 as components
from streamlit_flexselect.streamlit_callback import register_callback

_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "flexselect",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("flexselect", path=build_dir)


def flexselect(
    label,
    options: List[str],
    default_values: Optional[List[str]] = None,
    key=None,
    *,
    add_missing_defaults=False,
    on_change=None,
    args=None,
    kwargs=None,
) -> List[str]:
    """
    Creates a flexible select component that allows the user to select one or more options from a list of options.

    Parameters:
    label (str): The label of the component.
    options (List[str]): A list of options to choose from.
    default_values (Optional[List[str]]): A list of default values to select. Defaults to None.
    key (Optional[str]): An optional key to use for the component. Defaults to None.
    add_missing_defaults (bool): If True, will add any default values that are not in the options list to the options list. Defaults to False.
    `on_change` (Optional[Callable]): An optional callback function to execute when the component value changes. **A key argument must be used to use the on_change** The callback must accept `key` as the first argument, and can accept more arguments. To accept these additional arguments, you need to pass `args`/`kwargs` to the component. Defaults to None.
    args (Optional[List]): An optional list of arguments to pass to the callback function. Defaults to None.
    kwargs (Optional[Dict]): An optional dictionary of keyword arguments to pass to the callback function. Defaults to None.

    Returns:
    The value(s) selected by the user.
    """
    if on_change is not None:
        if key is None:
            st.error("You must pass a key if you want to use the on_change callback for the option menu")
        else:
            register_callback(key, on_change, key, args=args, kwargs=kwargs)

    options = [str(option) for option in options]
    str_defaults = []
    default_values = default_values or []

    _handle_options(options, default_values, add_missing_defaults, str_defaults)

    component_value = _component_func(
        label=label, options=options, default_values=default_values, key=key, default=default_values
    )

    # We could modify the value returned from the component if we wanted.
    # There's no need to do this in our simple example - but it's an option.
    return component_value


def _handle_options(options, default_values, add_missing_defaults, str_defaults):
    if add_missing_defaults:
        for value in default_values:
            if value not in options:
                options.append(value)
    else:
        for value in default_values:
            assert (
                str(value) in options
            ), f"Every Multiselect default value must exist in options. Got default value {value} options are {options}"
            str_defaults.append(str(value))
