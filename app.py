import streamlit as st

from streamlit_flexselect import flexselect

value = flexselect('test', ['a','b','c'], default_values=['a'])
st.multiselect('test', [1,2,3,4,1], default=[1,2,1,1])
st.header("Wow")
st.write("My Value is : ", value)