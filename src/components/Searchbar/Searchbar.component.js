import { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchBar, SearchForm, Input, SerchButton } from './Searchbar.styled';
import Container from 'components/common/Container';

class Searchbar extends Component {
    static defaultProps = {
        onSubmit: PropTypes.func.isRequired
    }
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
        const sanitizedQuery = inputValue.trim().toLowerCase();
        
        onSubmit(sanitizedQuery);
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

export default Searchbar;