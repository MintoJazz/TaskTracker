CREATE TYPE servico_registry AS ENUM ( --> expansível
    'MANUTENÇÃO',
    'SUPORTE'
);

CREATE TYPE status_registry AS ENUM (
    'FINALIZADO',
    'CANCELADO',
    'INICIADO'
);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    nome VARCHAR(100),
    senha VARCHAR(100)
);

CREATE TABLE tecnico (
    usuario_id INTEGER UNIQUE REFERENCES usuario (id),
    tipo servico_registry DEFAULT NULL
);

CREATE TABLE servico (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    descricao TEXT,
    data_hora_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    criador_id INTEGER REFERENCES usuario(id),
    status status_registry DEFAULT 'INICIADO',
    tipo_servico servico_registry
);

CREATE TABLE atendimento (
    id SERIAL PRIMARY KEY,
    servico_id INTEGER REFERENCES servico(id),
    tecnico_id INTEGER REFERENCES tecnico(usuario_id),
    inicio_atendimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fim_atendimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);