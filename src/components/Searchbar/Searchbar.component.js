import { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchBar, SearchForm, Input, SerchButton } from './Searchbar.styled';
import Container from 'components/common/Container';

class Searchbar extends Component {
    state = {
        inputValue: '',
    }
    handleInputChange = (e) => {
        const { value } = e.target;
        this.setState({ inputValue: value });
    }
    handleSubmit = (e) => {
        e.preventDefault();

        const { onSubmit } = this.props;
        const { inputValue } = this.state;
        
        onSubmit(inputValue);
        // this.setState({ inputValue: ''});
    }
    render () {
        const { inputValue } = this.state;

        return (
            <SearchBar>
                <Container>
                    <SearchForm 
                        onSubmit={this.handleSubmit}
                    >
                        <SerchButton type="submit">
                            Search
                        </SerchButton>
        
                        <Input
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                            value={inputValue}
                            onChange={this.handleInputChange}
                        />
                    </SearchForm>
                </Container>
            </SearchBar>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Searchbar;