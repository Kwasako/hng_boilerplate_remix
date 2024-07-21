import React, { useState } from 'react';
import styles from './CookieConsent.module.css';
import { cookieSettings } from '~/data/ui';

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
                <div className="flex-grow pr-20">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-lg font-medium">{title}</p>
                        <div 
                            className="ml-4 cursor-pointer" 
                            onClick={onToggle}  
                            role="button" 
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    onToggle();
                                    e.preventDefault()
                                }
                            }}
                            aria-expanded={isExpanded}
                        >
                            <img 
                                src={isExpanded ? '/chevron-down.svg' : '/chevron-up.svg'} 
                                alt={isExpanded ? 'Collapse' : 'Expand'}
                            />
                        </div>
                    </div>
                    <p className={`text-sm text-gray-600 ${isExpanded ? '' : 'hidden'} ${styles.inter}` }>
                        {description}
                    </p>
                    <hr className="my-6" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor={id}>
                    <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        id={id}
                        checked={isChecked}
                        onChange={(e) => onCheckChange(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
            </div>
        </div>
    );
};

const CookieSettings: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});


    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleCheckChange = (id: string, checked: boolean) => {
        setCheckedStates(prev => ({ ...prev, [id]: checked }));
    };

    return (
        <div>
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
    );
};

export default CookieSettings;