import streamlit as st
from streamlit_flexselect import flexselect


def on_change(key, *args, **kwargs):
    st.write("elements:", st.session_state[key])
    st.write("args:", args)
    st.write("kwargs:", kwargs)


def main():
    st.title("Streamlit FlexSelect Example")

    selected_values = flexselect(
        label="Select your favorite fruits",
        options=["Apple", "Orange", "Banana", "Grapes"],
        default_values=["Apple"],
        key='flexselect',
        args=['test'],
        on_change=on_change,
    )

    st.write(f"You selected: ", selected_values)


if __name__ == "__main__":
    main()
