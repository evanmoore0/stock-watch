import React from 'react'
import { render } from '@testing-library/react-native'
import GraphicBar from '../GraphicBar'

jest.useFakeTimers()

describe('<GraphicBar/>', () => {
    it("Works", () => {
        const butt = render(<GraphicBar/>).toJSON();
        expect(butt).toMatchSnapshot()
        
        
      });
})