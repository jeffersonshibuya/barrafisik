﻿using System;
using System.Collections.Generic;
using BarraFisik.Application.Validation;
using BarraFisik.Application.ViewModels;

namespace BarraFisik.Application.Interfaces
{
    public interface IClienteAppService : IDisposable
    {
        ValidationAppResult Add(ClienteViewModel clienteViewModel);
        ClienteViewModel GetById(Guid id);
        IEnumerable<ClienteViewModel> GetAll();
        ValidationAppResult Update(ClienteViewModel clienteViewModel);
        void Remove(ClienteViewModel clienteViewModel);

        ClienteViewModel GetClienteHorario(Guid id);
    }
}