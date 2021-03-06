import React from 'react';
import { shallow } from 'enzyme';
import ConsentByProcessor from './ConsentByProcessor';
import ItemsCard from 'components/core/cards/dashboard/ItemsCard';

describe('(Component) ConsentByProcessor', () => {
  it('should render', () => {
    const props = {
      totalSubjects: 100,
      processors: [
        {
          name: 'p1',
          consented: 1
        }
      ]
    };
    const component = shallow(<ConsentByProcessor {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render if numbers are 0', () => {
    const props = {
      totalSubjects: 0,
      processors: [
        {
          name: 'p1',
          consented: 0
        }
      ]
    };
    const component = shallow(<ConsentByProcessor {...props} />);
    expect(component.find(ItemsCard).props().data[0].fillPercent).toEqual(100);
    expect(component).toMatchSnapshot();
  });

  it('should do the math correctly', () => {
    const props = {
      totalSubjects: 100,
      processors: [
        {
          name: 'p1',
          consented: 32
        }
      ]
    };
    const component = shallow(<ConsentByProcessor {...props} />);
    expect(component.find(ItemsCard).props().data[0].fillPercent).toEqual(32);
    expect(component).toMatchSnapshot();
  });
});
