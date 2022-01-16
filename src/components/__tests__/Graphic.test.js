import React from 'react'
import { render } from '@testing-library/react-native'
import Graphic from '../Graphic'

jest.useFakeTimers()

describe('<Graphic/>', () => {
    it("Works", () => {
        const butt = render(<Graphic/>).toJSON();
        expect(butt).toMatchSnapshot()
        
        
      });
})