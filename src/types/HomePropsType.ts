import InterestType from "./InterestType";

export type children = (props: {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    interests: InterestType[];
    error?: string | null
}) => JSX.Element;
export interface HomeComponentType {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    interests: InterestType[];
}

export interface HomeComponentServiceProps {
    children: children

}

