import React, { Component } from 'react';
import { SegmentedControl, SearchInput } from 'evergreen-ui';
import './Header.css';

class Header extends Component {
  render() {
    let options = [{ label: 'Live', value: 'live' }, { label: 'Pause', value: 'pause' }];
    let value = 'live';
    return (
      <div className="header-container">
        <div className="header-buttons">
          <SegmentedControl
            width={100}
            height={30}
            options={options}
            name={"control-feed"}
            defaultValue={value}
            onChange={(v) => {
              value = v;
              this.props.changeClick(v);
            }}
          />
        </div>
        <div className="search-input">
          <SearchInput placeholder="Type to search..." onChange={this.props.search} />
        </div>
      </div>
    );
  }
}

export default Header;
