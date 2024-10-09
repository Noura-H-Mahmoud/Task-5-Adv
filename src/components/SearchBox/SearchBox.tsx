import './SearchBox.css'

interface SearchBoxProps {
  onSearchChange: (searchTerm: string) => void;
}
export default function SearchBox({ onSearchChange }: SearchBoxProps) {
  return (
    <div className='NM_InputSearchContainer'>
      <input type="search"
        name="search"
        placeholder='Search product by name'
        className='NM_InputSearch'
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}


