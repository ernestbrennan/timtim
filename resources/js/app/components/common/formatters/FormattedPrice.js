// eslint-disable-next-line no-unused-vars
import React from 'react';
import { formatToCorrectPrice } from '$app/utlis/price';

const FormattedPrice = ({ price }) => formatToCorrectPrice(price);

export default FormattedPrice;
