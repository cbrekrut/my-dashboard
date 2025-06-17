import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Dialog } from '../components/ui/Dialog';
import { Folder, FileText, ChevronDown, ChevronRight } from 'lucide-react';

interface ProjectFile {
  name?: string;
  type?: string;
  folder?: string;
  children?: ProjectFile[];
}

interface Project {
  name: string;
  status: string;
  lastAction: string;
  client: {
    name: string;
    inn: string;
    contact: string;
  };
  documents: ProjectFile[];
}

function generateExecutiveDocs(): ProjectFile[] {
  return [
    {
      folder: 'Исполнительная документация',
      children: [
        {
          folder: '001. Реестр ИД',
          children: [
            { name: '00. Реестр исполнительной документации.doc', type: 'doc' },
            { name: '01. Акт готовности строительной части помещений.doc', type: 'doc' },
            { name: '02. Акт индивидуального испытания оборудования.doc', type: 'doc' },
            { name: '03. Акт техн. готовн. элект. работ.doc', type: 'doc' },
          ],
        },
        {
          folder: '002. Акты, паспорта и сертификаты',
          children: [
            {
              folder: '001 паспорта на светильники',
              children: [],
            },
            { name: 'Акт 001 на светильники.docx', type: 'docx' },
            { name: 'Акт 002 на электрооборудование.docx', type: 'docx' },
          ],
        },
        {
          folder: '003. СРО',
          children: [
            { name: '001. Выписка из реестра СРО.pdf', type: 'pdf' },
            { name: '002. Свидетельство о регистрации электролаборатории.pdf', type: 'pdf' },
          ],
        },
        {
          folder: '004. Чертежи',
          children: [
            { name: 'ИД л.2.dwg', type: 'dwg' },
            { name: 'ИД л.3.pdf', type: 'pdf' },
          ],
        },
        {
          folder: '005. Кабельный журнал',
          children: [
            { name: 'Журнал прокладки кабелей.docx', type: 'docx' },
          ],
        },
        {
          folder: '006. Журнал входного контроля',
          children: [
            { name: 'Журнал входного контроля.docx', type: 'docx' },
          ],
        },
        {
          folder: '007. Скан ИД',
          children: [
            { name: 'ИД Галерея 16.pdf', type: 'pdf' },
          ],
        },
      ],
    },
  ];
}

const sampleProjects: Project[] = [
  {
    name: 'Интернет-магазин мебели',
    status: 'В работе',
    lastAction: 'Создана исполнительная документация',
    client: {
      name: 'ООО МебельПро',
      inn: '7701234567',
      contact: 'Иван Петров',
    },
    documents: [],
  },
  {
    name: 'CRM для отдела продаж',
    status: 'Завершен',
    lastAction: 'Проект закрыт заказчиком',
    client: {
      name: 'ЗАО Продажи+',
      inn: '7812345678',
      contact: 'Анна Смирнова',
    },
    documents: [],
  },
  {
    name: 'Лендинг для стартапа',
    status: 'Ожидает запуска',
    lastAction: 'Добавлен проект в систему',
    client: {
      name: 'ИП Новиков',
      inn: '5045678912',
      contact: 'Максим Новиков',
    },
    documents: [],
  },
];

const statusColor: Record<string, string> = {
  'В работе': 'bg-yellow-500',
  'Завершен': 'bg-green-500',
  'Ожидает запуска': 'bg-gray-400',
};

function FolderItem({ item }: { item: ProjectFile }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.name) {
    return (
      <li className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-blue-500" /> {item.name}
      </li>
    );
  }

  return (
    <div className="ml-4 mt-2">
      <div
        className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        <Folder className="w-4 h-4 text-yellow-600" />
        <span className="font-medium">{item.folder}</span>
      </div>
      {isOpen && (
        <ul className="ml-6 mt-1 list-disc text-sm space-y-1">
          {item.children?.map((child, idx) => (
            <FolderItem key={idx} item={child} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'files' | 'docs' | 'estimate'>('files');

  useEffect(() => {
    setProjects(sampleProjects);
  }, []);

  const generateDocumentation = () => {
    if (!selectedProject) return;

    const newDocs = generateExecutiveDocs();

    const updated = projects.map(p =>
    p.name === selectedProject.name
        ? { ...p, documents: newDocs }
        : p
    );
    setProjects(updated);
    setSelectedProject({ ...selectedProject, documents: newDocs });
    alert(`Сформирована исполнительная документация для проекта: ${selectedProject.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">БМ-Электро — проекты</h1>
      <Card className="p-0 overflow-hidden border">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[20%]" />
            <col className="w-[40%]" />
          </colgroup>
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 border-b">Название проекта</th>
              <th className="text-left px-4 py-3 border-b">Статус</th>
              <th className="text-left px-4 py-3 border-b">Последнее действие</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={index}
                onClick={() => {
                  setSelectedProject(project);
                  setActiveTab('files');
                  setIsDialogOpen(true);
                }}
                className="cursor-pointer hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2 border-b font-medium align-top">{project.name}</td>
                <td className="px-4 py-2 border-b align-top">
                  <Badge className={`${statusColor[project.status]} text-white`}>
                    {project.status}
                  </Badge>
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-600 align-top">{project.lastAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {selectedProject && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="w-[90vw] max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">{selectedProject.name}</h2>
            <div className="flex gap-6">
              <aside className="w-1/3 pr-4 border-r">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Информация о проекте</h3>
                  <p><strong>Название:</strong> {selectedProject.name}</p>
                  <p><strong>Статус:</strong> {selectedProject.status}</p>
                  <p><strong>Последнее действие:</strong> {selectedProject.lastAction}</p>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Клиент</h4>
                  <p><strong>Организация:</strong> {selectedProject.client.name}</p>
                  <p><strong>ИНН:</strong> {selectedProject.client.inn}</p>
                  <p><strong>Контактное лицо:</strong> {selectedProject.client.contact}</p>
                </div>
                <div className="space-y-2">
                  <Button onClick={() => setActiveTab('files')} className={activeTab === 'files' ? 'w-full bg-blue-600' : 'w-full bg-gray-200 text-black'}>
                    Файлы проекта
                  </Button>
                  <Button onClick={() => setActiveTab('docs')} className={activeTab === 'docs' ? 'w-full bg-blue-600' : 'w-full bg-gray-200 text-black'}>
                    Исполнительная документация
                  </Button>
                  <Button onClick={() => setActiveTab('estimate')} className={activeTab === 'estimate' ? 'w-full bg-blue-600' : 'w-full bg-gray-200 text-black'}>
                    Создать смету
                  </Button>
                </div>
              </aside>
              <section className="w-2/3 max-h-[70vh] overflow-y-auto pr-2">
                {activeTab === 'files' && (
                  <div>
                    <div className="flex items-center justify-between mb-3 px-6">
                        <h3 className="text-lg font-semibold">Файлы проекта</h3>
                        <button
                            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-3 py-1"
                            onClick={() => alert('ZIP download started')}
                        >
                            Скачать ZIP
                        </button>
                    </div>
                    {selectedProject.documents.length > 0 ? (
                      <div className="space-y-2">
                        {selectedProject.documents.map((item, i) => (
                          <FolderItem key={i} item={item} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Нет загруженных файлов.</p>
                    )}
                  </div>
                )}
                {activeTab === 'docs' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Исполнительная документация</h3>
                    <p className="text-sm text-gray-600 mb-4">Нажмите кнопку, чтобы сгенерировать структуру.</p>
                    <Button
                        onClick={() => {
                            if (selectedProject) {
                            const updatedProjects = projects.map(project =>
                                project === selectedProject
                                ? { ...project, documents: generateExecutiveDocs() }
                                : project
                            );
                            setProjects(updatedProjects);
                            setSelectedProject(prev => prev ? { ...prev, documents: generateExecutiveDocs() } : null);
                            }
                        }}
                        >
                        Сформировать документ
                        </Button>
                  </div>
                )}
                {activeTab === 'estimate' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Создание сметы</h3>
                    <p className="text-sm text-gray-600">Форма или таблица для расчёта сметы проекта.</p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
