import React from 'react'
import Loading from '../Loading'
import {render} from '@testing-library/react-native'

const mockedDispatch = jest.fn();

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
            dispatch: mockedDispatch
        })
    }
})


describe("Loading", () => {
    beforeEach(() => {
      // Alternatively, set "clearMocks" in your Jest config to "true"
      mockedDispatch.mockClear();
    });
  
    it("toggles navigation drawer on press", () => {
      const butt = render(<Loading />).toJSON();
      expect(butt).toMatchSnapshot()
    });
  });