import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Switch } from "../switch";
import { Button } from "../button";

interface CookieSetting {
    title: string;
    description: string;
    id: string;
}

interface CookiePreferenceProps extends CookieSetting {
    isExpanded: boolean;
    onToggle: () => void;
    isChecked: boolean;
    onCheckChange: (checked: boolean) => void;
}

const CookiePreference: React.FC<CookiePreferenceProps> = ({ 
    title, 
    description, 
    isExpanded, 
    onToggle, 
    id, 
    isChecked, 
    onCheckChange 
}) => {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-start">
                <div className="flex-grow pr-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{title}</h3>
                        <Button variant="ghost" size="sm" onClick={onToggle}>
                            <img 
                                src={isExpanded ? '/chevron-down.svg' : '/chevron-up.svg'} 
                                alt={isExpanded ? 'Collapse' : 'Expand'}
                                className="w-4 h-4"
                            />
                        </Button>
                    </div>
                    {isExpanded && (
                        <p className="text-sm text-gray-600 mt-2">
                            {description}
                        </p>
                    )}
                </div>
                <Switch
                    id={id}
                    checked={isChecked}
                    onCheckedChange={onCheckChange}
                />
            </div>
            <hr className="my-4" />
        </div>
    );
};

const CookieSettings: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        setIsClient(true);
    }, []);

    const cookieSettings: CookieSetting[] = [
        {
            title: "Performance Cookies",
            id: "pc",
            description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site."
        },
        {
            title: "Functional Cookies",
            id: "fc",
            description: "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages."
        },
        {
            title: "Targeting Cookies",
            id: "tc",
            description: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites."
        }
    ];

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleCheckChange = (id: string, checked: boolean) => {
        setCheckedStates(prev => ({ ...prev, [id]: checked }));
    };

    const handleSave = () => {
        console.log('Saved preferences:', checkedStates);
        setIsOpen(false);
    };

    if (!isClient) {
        return null; // or a loading placeholder
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Cookie Settings</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cookie Settings</DialogTitle>
                    <DialogDescription>
                        Manage your cookie preferences here. You can enable or disable different types of cookies.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    {cookieSettings.map((setting, index) => (
                        <CookiePreference 
                            key={index}
                            title={setting.title}
                            description={setting.description}
                            isExpanded={expandedIndex === index}
                            onToggle={() => handleToggle(index)}
                            id={setting.id}
                            isChecked={checkedStates[setting.id] || false}
                            onCheckChange={(checked) => handleCheckChange(setting.id, checked)}
                        />
                    ))}
                </div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={handleSave}>Save Preferences</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CookieSettings;